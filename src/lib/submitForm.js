// Posts a form to one of the PHP mail endpoints in public/ and resolves on the endpoint's success reply.
export default async function submitForm(endpoint, formData, successReply) {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
  const reply = (await response.text()).trim();
  if (!response.ok || reply !== successReply) {
    throw new Error(reply || `Request failed (${response.status})`);
  }
}
