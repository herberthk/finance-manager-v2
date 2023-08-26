import type { Account } from "@/types";

export const getTotal = (ar: number[]): number =>
  ar.reduce((a: number, b: number) => a + b, 0);

export const debitMinusCreditTotal = (account: Account[]): number =>
  account
    .filter((b) => b.type === "dr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0) -
  account
    .filter((b) => b.type === "cr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0);

export const getTotalDebit = (account: Account[]): number =>
  account
    .filter((b) => b.type === "dr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0);

export const getTotalCredit = (account: Account[]): number =>
  account
    .filter((b) => b.type === "cr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0);

// export const useFreshAccountData = (data: Data): void => {
//   const {
//     getBank,
//     getCapital,
//     getCash,
//     getJournal,
//     getLand,
//     getMachine,
//     getVehicle,
//   } = useCustomDispatch();

//   (async () => {
//     await getBank(data.bank);
//     await getCapital(data.capital);
//     await getCash(data.cash);
//     await getJournal(data.journal);
//     await getLand(data.land);
//     await getMachine(data.machine);
//     await getVehicle(data.vehicle);
//   })();
// };
export const creditMinusDebitTotal = (account: Account[]): number =>
  account
    .filter((b) => b.type === "cr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0) -
  account
    .filter((b) => b.type === "dr")
    .map((b) => b.amount)
    .reduce((a, b) => a + b, 0);
