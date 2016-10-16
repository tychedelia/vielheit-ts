import kernel from './config/di-config'
import IApp from './interfaces/app'
import __ from './config/app-constants'

const title =
    `
    ___       ___       ___       ___   
   /\\__\\     /\\  \\     /\\  \\     /\\__\\  
  /:/ _/_   _\\:\\  \\   /::\\  \\   /:/  /  
 |::L/\\__\\ /\\/::\\__\\ /::\\:\\__\\ /:/__/   
 |::::/  / \\::/\\/__/ \\:\\:\\/  / \\:\\  \\   
  L;;/__/   \\:\\__\\    \\:\\/  /   \\:\\__\\  
             \\/__/     \\/__/     \\/__/  
    ___       ___       ___       ___   
   /\\__\\     /\\  \\     /\\  \\     /\\  \\  
  /:/__/_   /::\\  \\   _\\:\\  \\    \\:\\  \\ 
 /::\\/\\__\\ /::\\:\\__\\ /\\/::\\__\\   /::\\__\\
 \\/\\::/  / \\:\\:\\/  / \\::/\\/__/  /:/\\/__/
   /:/  /   \\:\\/  /   \\:\\__\\    \\/__/   
   \\/__/     \\/__/     \\/__/            
________________________________________                                                       
`;

console.log(title);
const app = kernel.get<IApp>(__.App);
try {
    app.bootstrap()
} catch (e) {
    console.log(e)
}
export default function graceful_shutdown() {
    app.close()
}