import React from 'react';
import { Formik, Field, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';



function App() {
    function onSubmit(values, actions) {
      console.log('SUBMIT', values);
    }
  
    function onBlurCep(ev, setFieldValue) {
      const { value } = ev.target;
  
      const cep = value?.replace(/[^0-9]/g, '');
  
      if (cep?.length !== 8) {
        return;
      }

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '250ch',
             },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
    },
    },
  }));
  const classes = useStyles();

  return (
    <div className="App">
      <Formik
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
        }}
        render={({ isValid, setFieldValue }) => (
            
            <Paper className={classes.paper}>
               
            <Grid  container  item xs={12}>

                 <Grid   item xs={4} spacing={1}> 
                  <label>Cep</label>
                  <Field name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
                 </Grid>

                 <Grid   item xs={4} spacing={1}> 
                   <label>Logradouro</label>
                   <Field name="logradouro" type="text" />  
                 </Grid>

                 <Grid   item xs={4} spacing={1}> 
                   <label>Número</label>
                   <Field name="numero" type="text" />
                 </Grid>
        
            </Grid>
    
            </Paper>
        
        )}
      />
    </div>
  );
}

export default App;