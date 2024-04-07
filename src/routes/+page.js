export async function load({ url }) {
    const name = url.searchParams.get('name');
    return { name };
}