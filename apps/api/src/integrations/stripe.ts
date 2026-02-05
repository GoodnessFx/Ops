export async function createInvoice(amount: number, currency: string, customerId: string) {
  return { id: Date.now().toString(), amount, currency, customerId };
}
