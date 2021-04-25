class Remisiones {
    constructor(id, folio, fecha, descripcion, total, pago, estado, facturacion, garantia){
        this.id = id;
        this.folio = folio;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.total = total;
        this.pago = pago;
        this.estado = estado;
        this.facturacion = facturacion; 
        this.garantia = garantia;
    }
}

export default Remisiones;