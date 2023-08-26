// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAccountBalance = () => {
  let stockValue = 0;
  let purchases = 0;
  let netPurchase = 0;

  // const stockBal = (item: string): number => {
  //   let num = 0;
  //   stock
  //     .filter((s) => s.item === item)
  //     .map((t) => {
  //       num = t.qty - t.sqty;
  //     });
  //   return num;
  // };
  // stock.map((t) => {
  //   stockValue += t.price * (t.qty - t.sqty);
  //   purchases += t.price * t.qty;
  //   netPurchase += t.price * t.sqty;
  // });
  // const grossProfit = salesBal - netPurchase;
  // const profit = grossProfit - expenseBal;
  // const tt = capital.map((c) => c.amount);
  // const totalCapital = getTotal(tt);
  // let totalCredit = totalCapital + salesBal;
  // const balSheetCreditTotal = totalCapital + profit;
  // let totalDebit =
  //   cashBal +
  //   bankBal +
  //   landBal +
  //   machineBal +
  //   vehicleBal +
  //   purchases +
  //   expenseBal;
  // const balSheetDebitTotal =
  //   cashBal + bankBal + landBal + machineBal + vehicleBal + stockValue;
  // const fixedAssetAvailable = () => landBal + machineBal + vehicleBal > 0;
  const cashBal = 0;
  const bankBal = 0;
  const landBal = 0;
  const vehicleBal = 0;
  const machineBal = 0;
  const totalCapital = 0;
  const totalCredit = 0;
  const totalDebit = 0;
  const cashDebitTotal = 0;
  const cashCreditTotal = 0;
  const bankDebitTotal = 0;
  const bankCreditTotal = 0;
  const landDebitTotal = 0;
  const vehicleDebitTotal = 0;
  const machineDebitTotal = 0;
  const landCreditTotal = 0;
  const vehicleCreditTotal = 0;
  const machineCreditTotal = 0;
  const fixedAssetAvailable = false;

  const balSheetCreditTotal = 0;
  const balSheetDebitTotal = 0;
  const salesBal = 0;

  const profit = 0;
  const expenseBal = 0;
  const grossProfit = 0;
  const stockBal = 0;

  return {
    cashBal,
    bankBal,
    landBal,
    vehicleBal,
    machineBal,
    totalCapital,
    totalCredit,
    totalDebit,
    cashDebitTotal,
    cashCreditTotal,
    bankDebitTotal,
    bankCreditTotal,
    landDebitTotal,
    vehicleDebitTotal,
    machineDebitTotal,
    landCreditTotal,
    vehicleCreditTotal,
    machineCreditTotal,
    fixedAssetAvailable,
    purchases,
    balSheetCreditTotal,
    balSheetDebitTotal,
    salesBal,
    stockValue,
    netPurchase,
    profit,
    expenseBal,
    grossProfit,
    stockBal,
  };
};

// export const useIncomeStatement = () => {
//   const { salesBal } = useAccountBalance();
//   const { stock } = useTypedSelector((state) => state.stock);
//   let netPurchase = 0;
//   stock.map((t) => ());

//   return {
//     salesBal,
//     netPurchase,
//     profit,
//   };
// };
