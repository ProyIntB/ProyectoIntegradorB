import firebase from '../firebase';
import Clientes from '../models/clientes';


const firestore = firebase.firestore();

export const getCliente = async () => {
    try {
        const response = await firestore.collection('cliente');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const clientes = new Clientes(
                doc.id,
                doc.data().ids,
                doc.data().nombre,
                doc.data().apellido,
                doc.data().correo,
                doc.data().telefono,
                doc.data().direccion
            );

            array.push(clientes);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addClientes = async (clientes) => {
    try {
        await firestore.collection('cliente').doc().set(clientes);
    } catch (error) {
        throw error;
    }
}

export const getClientes = async (id) => {
    try {
        const clientes = await firestore.collection('cliente').doc(id);
        const data = await clientes.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateClientes = async (id, data) => {
    try {
        const clientes = await firestore.collection('cliente').doc(id);
        await clientes.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteClientes = async (id) => {
    try {
        await firestore.collection('cliente').doc(id).delete();
    } catch (error) {
        throw error;
    }
}