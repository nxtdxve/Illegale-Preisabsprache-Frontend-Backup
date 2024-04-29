import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import { fetchProductById, unsubscribeFromPriceChanges } from '../services/api';

function UnsubscribePage() {
  const { email, productId } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ severity: 'info', message: '' });

  useEffect(() => {
    if (productId !== '*') {
      setLoading(true);
      fetchProductById(productId).then(product => {
        setProductName(product.name);
        setLoading(false);
      }).catch(error => {
        console.error('Failed to fetch product details:', error);
        setLoading(false);
      });
    }
  }, [productId]);

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromPriceChanges(productId, email);
      setAlertInfo({ severity: 'success', message: 'Abonnement erfolgreich gekündigt.' });
      setAlertOpen(true);
      setTimeout(() => navigate('/'), 2000); // Navigate after showing message
    } catch (error) {
      setAlertInfo({ severity: 'error', message: 'Abonnement nicht gefunden oder wurde bereits gekündigt.' });
      setAlertOpen(true);
      console.error('Unsubscribe error:', error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const productText = productId === '*' ? "wöchentliche Updates" : `E-Mails für das Produkt "${productName}"`;

  if (loading) {
    return <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Container>;
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Möchten Sie wirklich die {productText} abbestellen?
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Abonniert mit: {email}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleUnsubscribe} sx={{ mx: 2 }}>
            Ja, abbestellen
          </Button>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mx: 2 }}>
            Nein, beibehalten
          </Button>
        </Box>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UnsubscribePage;
