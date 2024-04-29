import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PriceChart from "../components/Chart/PriceChart";
import RetailerLinks from "../components/Product/RetailerLinks";
import SubscribeModal from "../components/Modal/SubscribeModal";
import { fetchProductById, subscribeToPriceChanges } from "../services/api";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSubscribe = async () => {
    try {
      await subscribeToPriceChanges(id, email);
      setAlertMessage("Subscription erfolgreich!");
      setAlertSeverity("success");
      setAlertOpen(true);
      handleCloseModal();
    } catch (error) {
      setAlertMessage("Subscription fehlgeschlagen.");
      setAlertSeverity("error");
      setAlertOpen(true);
      console.error("Subscription error:", error);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 5 }}>
        Product not found
      </Typography>
    );
  }

  const retailerInfo = product.retailer_urls.map((url) => {
    const priceRecord = product.price_details.price_records.find(
      (record) => record.retailer_id === url.retailer_id.$oid
    );
    return {
      retailer_id: url.retailer_id.$oid,
      name: url.url.includes("bauhaus") ? "Bauhaus" : "Hornbach",
      price: priceRecord ? priceRecord.price : "N/A",
      url: url.url,
    };
  });

  return (
    <Container>
      <IconButton
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 20, left: 20 }}
      >
        <HomeIcon />
      </IconButton>
      <Paper style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1">Kategorie: {product.category}</Typography>
        <Button
          variant="contained"
          startIcon={<MailIcon />}
          onClick={handleOpenModal}
        >
          Benarichtige mich bei Preisupdates
        </Button>
        <PriceChart priceData={product.price_details} />
        <RetailerLinks retailerInfo={retailerInfo} />
      </Paper>
      <SubscribeModal
        open={openModal}
        handleClose={handleCloseModal}
        email={email}
        setEmail={setEmail}
        handleSubscribe={handleSubscribe}
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductPage;
