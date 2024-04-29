import React, { useState, useEffect } from "react";
import ProductCard from "../components/Product/ProductCard";
import AddProductCard from "../components/Product/AddProductCard";
import CategoryFilter from "../components/Filter/CategoryFilter";
import SubscribeModal from "../components/Modal/SubscribeModal";
import { fetchProducts, subscribeToPriceChanges, addProduct } from "../services/api";
import {
  Grid,
  Container,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleFilterChange = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSubscribe = async () => {
    try {
      await subscribeToPriceChanges("*", email);
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

  const handleAddProduct = async (productData) => {
    try {
      const response = await addProduct(productData);
      console.log('Product added successfully:', response);
    } catch (error) {
      console.error('Failed to add product:', error);
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

  return (
    <Container sx={{ marginBottom: 4, marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          flexDirection: isSmallScreen ? 'column' : 'row'
        }}
      >
        <CategoryFilter
          onChange={handleFilterChange}
          categories={["All", ...new Set(products.map((p) => p.category))]}
          sx={{ flex: 1, minWidth: 120, maxWidth: isSmallScreen ? '100%' : '250px' }}
        />
        <Button
          variant="contained"
          startIcon={<MailIcon />}
          onClick={handleOpenModal}
          sx={{ width: "auto", minWidth: isSmallScreen ? '100%' : 'auto' }}
        >
          Abonnieren für wöchentliche Updates
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <AddProductCard onAddProduct={handleAddProduct} />
        </Grid> 
      </Grid>
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

export default HomePage;