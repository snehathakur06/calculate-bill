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

const categories = [
  {
    id: "C1",
    categoryName: "Platters",
    superCategory: {
      superCategoryName: "South Indian",
      id: "SC1"
    }
  },
  {
    id: "C2",
    categoryName: "Breads",
    superCategory: {
      superCategoryName: "North Indian",
      id: "SC2"
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
    },
    {
      id: "item1",
      quantity: 4,
      discount: {
        rate: 0,
        isInPercent: "Y"
      }
    }
  ]
};

// Function to calculate item amount with discount and tax
function calculateItemAmount(item, quantity, discount, taxes) {
  let amount = item.rate * quantity;

  // Apply discount
  if (discount && discount.rate > 0) {
    if (discount.isInPercent === "Y") {
      amount -= (amount * discount.rate) / 100;
    } else {
      amount -= discount.rate;
    }
  }

  // Apply taxes
  if (taxes && taxes.length > 0) {
    taxes.forEach(tax => {
      if (tax.isInPercent === "Y") {
        amount += (amount * tax.rate) / 100;
      } else {
        amount += tax.rate;
      }
    });
  }

  return parseFloat(amount.toFixed(2));
}

function getFullBillStructure(bill, items, categories) {
  let totalAmount = 0;

  const billItems = bill.billItems.map(billItem => {
    const itemDetail = items.find(i => i.id === billItem.id);
    const category = categories.find(cat => cat.id === itemDetail.category.categoryId);

    const amount = calculateItemAmount(itemDetail, billItem.quantity, billItem.discount, itemDetail.taxes);
    totalAmount += amount;

    return {
      id: itemDetail.id,
      name: itemDetail.itemName,
      quantity: billItem.quantity,
      discount: billItem.discount,
      taxes: itemDetail.taxes,
      amount: amount,
      superCategoryName: category?.superCategory?.superCategoryName || "",
      categoryName: category?.categoryName || ""
    };
  });

  return {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: billItems,
    TotalAmount: parseFloat(totalAmount.toFixed(2))
  };
}

// Output
console.log("Task 2 Output:");
console.log(JSON.stringify(getFullBillStructure(bill, items, categories), null, 2));
