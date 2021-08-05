const Ventas = () => {
    return (
        <form>
            <h2>Ventas </h2>
            <input type="text" placeholder="Nombre Cliente"></input>
            <select name="Paquetes">
                <option value="">Paquete 1</option>
                <option value="">Paquete 2</option>
            </select>
            <input type="number" placeholder="Cantidad Adultos"></input>
            <input type="number" placeholder="Cantidad Niños"></input>  
            <button>Realizar Venta</button>
        </form>
    )
}

export default Ventas;