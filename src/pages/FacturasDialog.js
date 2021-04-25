import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const FacturasDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Agregar nueva factura' : 'Actualizar'}  </DialogTitle>
            <ValidatorForm
                onSubmit={props.addFacturas}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Razón Social"
                            onChange={props.changeRazon}
                            name="razon"
                            value={props.razon}
                            validators={['required']}
                            errorMessages={['Este campo es obligatorio']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="RFC"
                            onChange={props.changeRfc}
                            name="rfc"
                            value={props.rfc}
                            validators={['required']}
                            errorMessages={['Este campo es obligatorio']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Calle"
                                onChange={props.changeCalle}
                                name="calle"
                                value={props.calle}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Colonia"
                                onChange={props.changeColonia}
                                name="colonia"
                                value={props.colonia}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Municipio"
                                onChange={props.changeMunicipio}
                                name="municipio"
                                value={props.municipio}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Código postal"
                                onChange={props.changeCp}
                                name="cp"
                                value={props.cp}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Telefono"
                                onChange={props.changeTelefono}
                                name="telefono"
                                value={props.telefono}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                       {props.formmode ? 'Agregar' : 'Actualizar'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default FacturasDialog;