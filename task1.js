// task1.js

const items = [
  {
    id: "item1",
    itemName: "Butter Roti",
    rate: 20,
    taxes: [
      {
        name: "Service Charge",
        rate: 10,
        isInPercent: "Y"
      }
    ],
    category: {
      categoryId: "C2"
    }
  },
  {
    id: "item2",
    itemName: "Paneer Butter Masala",
    rate: 100,
    taxes: [
      {
        name: "Service Charge",
        rate: 10,
        isInPercent: "Y"
      }
    ],
    category: {
      categoryId: "C1"
    }
  }
];

const bill = {
  id: "B1",
  billNumber: 1,
  opentime: "06 Nov 2020 14:19",
  customerName: "CodeQuotient",
  billItems: [
    {
      id: "item2",
      quantity: 3,
      discount: {
        rate: 10,
        isInPercent: "Y"
      }
    }
  ]
};

// Function to generate basic bill structure
function getBasicBillStructure(bill, items) {
  const billItems = bill.billItems.map(billItem => {
    const itemDetail = items.find(i => i.id === billItem.id);
    return {
      id: billItem.id,
      name: itemDetail.itemName,
      quantity: billItem.quantity
    };
  });

  return {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: billItems
  };
}

// Output
console.log("Task 1 Output:");
console.log(JSON.stringify(getBasicBillStructure(bill, items), null, 2));
