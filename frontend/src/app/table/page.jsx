import TableData from "../../components/TableData"
async function getData() {
    const response = await fetch('https://cvc-app-api.onrender.com/api', { cache: 'no-store' });
    const data = await response.json();

    console.log(data);
    return data
}

async function Table() {
    const table = await getData();

  return (

    <main className="container mx-auto px-4 py-8">
        <TableData table={table}/>
    </main>
  );
}

export default Table;
