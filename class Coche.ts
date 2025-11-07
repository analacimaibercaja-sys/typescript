class Coche
{
    readonly matricula : string;
    readonly potencia: number;
    constructor (matricula :string, potencia: number)
    {
        this.matricula = matricula;
        this.potencia = potencia;
    }
}
class Garage
{
    readonly puntoDeVista :IPuntoDeVista;
    readonly coleccion :Coche[] = [];
    constructor(PuntoVista :IPuntoDeVista)
    {
        this.puntoDeVista = PuntoVista; 
    }
    add(Coche1 :Coche) :void
    {
        this.coleccion.push(Coche1);
    }
    sacaTodo()
    {
        this.coleccion.filter(this.puntoDeVista.Filtra).sort(this.puntoDeVista.Ordenar).forEach(this.puntoDeVista.Recorre);
    }
}

interface IPuntoDeVista
{
    Filtra(Coche1: Coche) :boolean
    Recorre(Coche1: Coche) :void
    Ordenar(Coche1: Coche, Coche2: Coche): number
}

class PuntoDeVistaMecanico implements IPuntoDeVista
{
    Filtra(Coche1: Coche): boolean {
        return Coche1.potencia > 0;
    }
    Recorre(Coche1: Coche): void {
        console.log(Coche1.matricula+"mecanico";
    }
    Ordenar(Coche1: Coche, Coche2: Coche): number {
        return Coche1.potencia - Coche2.potencia;
    }
}