import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import FontDev from "./UPCIB.TTF";
import moment from "moment";

// Register custom font
Font.register({ family: "Roboto", src: FontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary: {
    textAlign: "right",
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>WORAPONG SHOP</Text>
          <Text> วรพงษ์ ช้อป</Text>
          <Text>{moment(Date.now()).locale("th").format("ll")}</Text>
          <Table>
            <TH>
              <TD>รายการสินค้า</TD>
              <TD>ราคาสินค้า</TD>
              <TD>จำนวนสินค้า</TD>
            </TH>
            {order.products.map((p, index) => (
              <TR key={index}>
                <TD>{p.product.title}</TD>
                <TD>{p.price}</TD>
                <TD>{p.count}</TD>
              </TR>
            ))}
          </Table>
          <Text style={styles.summary}>ราคารวมสุทธิ : {order.cartTotal}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
