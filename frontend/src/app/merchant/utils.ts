export async function getMerchant(server:string) {
  const response = await fetch(`/api/merchant?server=${server}`);
  const merchant = (await response.json());

  // console.log('merchant ', merchant)
  return merchant.data;
}