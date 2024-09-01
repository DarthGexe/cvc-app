import TableData from "../../components/TableData"
async function getData() {
    const response = await fetch('http://vmi1493491.contaboserver.net:8000/api', { cache: 'no-store' });
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
