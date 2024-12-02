import { Box, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';


export default function Login() {


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f4f4f4"
        >
            <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{mb:1}}>
                <h2 style={{ marginBottom: 5, textAlign:'center' }}>Login</h2>
                <TextField
                    id="standard-basic"
                    label="User Name"
                    variant="standard"
                />
                </Box>

                <Box>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                </Box>
            </Paper>

        </Box>
    );
}
