export async function createLead(_apiKey: string, _email: string, _name: string) {
  return { id: Date.now().toString(), email: _email, name: _name };
}
