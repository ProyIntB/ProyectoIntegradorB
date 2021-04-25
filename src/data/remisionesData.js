import firebase from '../firebase';
import Remisiones from '../models/remisiones';


const firestore = firebase.firestore();

export const getRemision = async () => {
    try {
        const response = await firestore.collection('remision');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const remisiones = new Remisiones(
                doc.id,
                doc.data().folio,
                doc.data().fecha,
                doc.data().descripcion,
                doc.data().total,
                doc.data().pago,
                doc.data().estado,
                doc.data().facturacion,
                doc.data().garantia
            );

            array.push(remisiones);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addRemisiones = async (remisiones) => {
    try {
        await firestore.collection('remision').doc().set(remisiones);
    } catch (error) {
        throw error;
    }
}

export const getRemisiones = async (id) => {
    try {
        const remisiones = await firestore.collection('remision').doc(id);
        const data = await remisiones.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateRemisiones = async (id, data) => {
    try {
        const remisiones = await firestore.collection('remision').doc(id);
        await remisiones.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteRemisiones = async (id) => {
    try {
        await firestore.collection('remision').doc(id).delete();
    } catch (error) {
        throw error;
    }
}