import React, { useState, useEffect } from 'react';
import { fetchRetailers } from '../../services/api';
import { Card, CardContent, Typography, Modal, Box, TextField, IconButton, CardActionArea, Button, Snackbar, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

function AddProductCard({ onAddProduct }) {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    retailer_urls: [{ url: "", retailerId: "" }, { url: "", retailerId: "" }]
  });
  const [retailers, setRetailers] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const loadRetailers = async () => {
      const fetchedRetailers = await fetchRetailers();
      setRetailers(fetchedRetailers);
    };
    loadRetailers();
  }, []);

const findRetailerId = (url) => {
  try {
    const hostname = new URL(url).hostname;
    const retailer = retailers.find(r => hostname.includes(r.name.toLowerCase()));
    return retailer ? retailer._id.$oid : null;
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return null;
  }
};

const handleURLChange = (index, value) => {
  const newRetailerUrls = [...productData.retailer_urls];
  newRetailerUrls[index].url = value;
  setProductData({ ...productData, retailer_urls: newRetailerUrls });
};


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addURLField = () => {
    setProductData({
        ...productData,
        retailer_urls: [...productData.retailer_urls, { url: "", retailerId: "" }]
    });
  }; 

  const removeURLField = index => {
    let newRetailerUrls = [...productData.retailer_urls];
    if (newRetailerUrls.length > 2) {
        newRetailerUrls.splice(index, 1);
        setProductData({ ...productData, retailer_urls: newRetailerUrls });
    } else {
        setAlertInfo({ open: true, message: 'Mindestens zwei URLs sind erforderlich.', severity: 'error' });
    }
  };

  const handleProductChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    // Update retailer IDs at the time of submission
    const updatedUrls = productData.retailer_urls.map(url => ({
      ...url,
      retailerId: findRetailerId(url.url)
    }));
    const allHaveRetailerIds = updatedUrls.every(url => url.retailerId);

    if (!allHaveRetailerIds) {
      setAlertInfo({ open: true, message: 'Mindestens eine URL entspricht keinem registrierten Einzelhändler.', severity: 'error' });
      return;
    }

    try {
      setAlertInfo({ open: true, message: 'Produkt erfolgreich hinzugefügt!', severity: 'success' });
      handleClose();
    } catch (error) {
      setAlertInfo({ open: true, message: error.response.data.error, severity: 'error' });
    }
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardActionArea onClick={handleOpen} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5">Neues Produkt hinzufügen</Typography>
            <AddCircleOutlineIcon sx={{ fontSize: '48px', opacity: 0.7, mt: 2 }} />
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary' }}>
            Hinweis: Wir überprüfen nicht die Existenz des Produkts und es kann bis zu 10 Minuten dauern, bis Preise angezeigt werden.
          </Typography>
          <TextField label="Name" name="name" value={productData.name} onChange={handleProductChange} fullWidth />
          <TextField label="Kategorie" name="category" value={productData.category} onChange={handleProductChange} fullWidth />
          {productData.retailer_urls.map((link, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    label="URL"
                    fullWidth
                    value={link.url}
                    onChange={(e) => handleURLChange(index, e.target.value)}
                />
                <IconButton onClick={() => removeURLField(index)} color="error">
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>
        ))}
          <Button startIcon={<AddIcon />} onClick={addURLField} color="primary">URL hinzufügen</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Speichern</Button>
        </Box>
      </Modal>
      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={() => setAlertInfo({ ...alertInfo, open: false })}>
        <Alert onClose={() => setAlertInfo({ ...alertInfo, open: false })} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddProductCard;
