import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface CarModel {
  modelName: string;
  brand: string;
}

interface PaymentReceiptPdfProps {
  selectedPosition: any;
  selectedCar: CarModel | any;
  totalPrice: number;
}

const logoImage = "https://i.ibb.co/Q69fC4x/Logo-bej.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#1f3f37",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  heading: {
    fontSize: 22,
    color: "#1f3f37",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 30,
    width: "80%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  tableRow: {
    flexDirection: "row",
    padding: 16,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
});

const PaymentReceiptPdf: React.FC<PaymentReceiptPdfProps> = ({
  selectedPosition,
  selectedCar,
  totalPrice,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Image style={styles.logo} src={logoImage} />
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.tableCell,
                  { fontWeight: "bold", color: "#1f3f37" },
                ]}
              >
                Payment Details
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Location</Text>
              <Text style={styles.tableCell}>
                {selectedPosition.position?.city || ""}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Latitude</Text>
              <Text style={styles.tableCell}>
                {selectedPosition.position?.latitude || 0}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Longitude</Text>
              <Text style={styles.tableCell}>
                {selectedPosition.position?.longitude || 0}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Car Model</Text>
              <Text style={styles.tableCell}>
                {selectedCar.modelName || ""}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total Price</Text>
              <Text style={styles.tableCell}>{`$${totalPrice.toFixed(
                2
              )}`}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentReceiptPdf;
