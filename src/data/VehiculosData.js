import firebase from '../firebase';
import Vehiculos from '../models/vehiculos';

const firestore = firebase.firestore();

export const getVehiculo = async () => {
    try {
        const response = await firestore.collection('vehiculo');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const vehiculos = new Vehiculos(
                doc.id, 
                doc.data().Placa,
                doc.data().Propietario, 
                doc.data().Marca,
                doc.data().Modelo,
                doc.data().Año,
                doc.data().Color,
                doc.data().Kilometraje
            );

            array.push(vehiculos);
        });
        return array; 
    } catch (error) {
        throw error;
    }
}

export const addVehiculos = async (vehiculos) => {
    try{
        await firestore.collection('vehiculo').doc().set(vehiculos);
    }catch (error) {
        throw error;
    }
}

export const getVehiculos = async (id, data) => {
    try {
        const vehiculos = await firestore.collection('vehiculo').doc(id);
        const data =await vehiculos.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateVehiculos = async (id, data) => {
    try {
        const vehiculos = await firestore.collection('vehiculo').doc(id);
        await vehiculos.update(data)
    } catch (error){
        throw error;
    }
}

export const deleteVehiculos = async (id) => {
    try {
        await firestore.collection('vehiculo').doc(id).delete();
    } catch (error) {
        throw error;
    }
}