import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, Grid, TextField, Button} from '@mui/material';
import QRCode from 'qrcode';
import QrReader from 'react-qr-scanner';
import { makeStyles } from '@material-ui/styles'

function App1({setId}) { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
  const [active,setActive]=useState(false);

  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log("Galat");
    setActive(false);
    // console.log(error);
  }
  const handleScanWebCam = (result) => {
    console.log("Sahi");
    
    if (result){
        setId(result.text);
        setScanResultWebCam(result.text);
        setActive(false);
        console.log(result.text);
    }
    else{
      // try again !!
    }
   }

   const onClickButton=()=>{
      setActive(true);
   }
  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}>Scan QR Code</h2>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                      <Button className={classes.btn} variant="contained" color="secondary" onClick={onClickButton}>Scan Qr Code</Button>
                        {(active)?
                        (<div>
                        <QrReader
                         delay={500}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                        </div>):
                         (<h1></h1>)}
                        </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#161d26',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default App1;