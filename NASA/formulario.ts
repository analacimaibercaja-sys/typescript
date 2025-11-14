import { ISistemaEntrada, IntroduccionReducido, IntroduccionExtendido,Astronauta,IPilot } from "./astronautaClases";
import { ISistemaSalida, FormatoAmericano, FormatoEuropeo } from "./astronautaClases";
import { ICriterioValidacion, ValidacionSimple, ValidacionAvanzada } from "./astronautaClases";
import { IMisionable, Mision } from "./astronautaClases";
import { ICapturable, Mineral, TipoRoca, Dureza, TipoTextura } from "./astronautaClases";
import { IPiloto, Pilot } from "./astronautaClases";

let SistemaEntrada: ISistemaEntrada = new IntroduccionReducido();
let SistemaSalida: ISistemaSalida = new FormatoAmericano();
let CriterioValidacion: ICriterioValidacion = new ValidacionSimple();
let Piloto: IPiloto = new Pilot("001", "Neil Armstrong", 38);

globalThis.addEventListener('DOMContentLoaded',domCargado);
function domCargado(){
    
}