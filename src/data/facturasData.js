import firebase from '../firebase';
import Facturas from '../models/facturas';


const firestore = firebase.firestore();

export const getFactura = async () => {
    try {
        const response = await firestore.collection('factura');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const facturas = new Facturas(
                doc.id,
                doc.data().razon,
                doc.data().rfc,
                doc.data().calle,
                doc.data().colonia,
                doc.data().municipio,
                doc.data().cp,
                doc.data().telefono
            );

            array.push(facturas);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addFacturas = async (facturas) => {
    try {
        await firestore.collection('factura').doc().set(facturas);
    } catch (error) {
        throw error;
    }
}

export const getFacturas = async (id) => {
    try {
        const facturas = await firestore.collection('factura').doc(id);
        const data = await facturas.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateFacturas = async (id, data) => {
    try {
        const facturas = await firestore.collection('factura').doc(id);
        await facturas.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteFacturas = async (id) => {
    try {
        await firestore.collection('factura').doc(id).delete();
    } catch (error) {
        throw error;
    }
}