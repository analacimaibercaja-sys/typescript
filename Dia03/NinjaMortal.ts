"use strict";
interface IArmable
{
    dameFuerzaDeAtaque(): number;
}

class Katana implements IArmable
{
    dameFuerzaDeAtaque(): number {
        return 50;
    }
}
class Shuriken implements IArmable
{
    dameFuerzaDeAtaque(): number {
        return 10;
    }
}
class Kunai implements IArmable
{
    dameFuerzaDeAtaque(): number {
       return 15; 
    }
}
class Kama implements IArmable
{
    dameFuerzaDeAtaque(): number {
        return 5;
    }
}
class Katanaka implements IArmable
{
    dameFuerzaDeAtaque(): number {
        return 100;
    }
}

interface IDefendible
{
    dameDefensa(): number;
}

class ArmaduraPaja implements IDefendible
{
    dameDefensa(): number {
        return 10;
    }
}
class ArmaduraBronce implements IDefendible
{
    dameDefensa(): number {
        return 15;
    }
}
class ArmaduraAcero implements IDefendible
{
    dameDefensa(): number {
        return 100;
    }
}
enum Tipo {Genin,Chulin,Jounin}; 

class Ninja
{
    Ataque: IArmable;
    Defensa: IDefendible;
    constructor(ataque : IArmable, defensa: IDefendible)
    {
        this.Ataque = ataque;
        this.Defensa = defensa;
    }
}

class FactoriaNinja
{
    dameNinja(enumeracion :Tipo):Ninja
    {
        switch (enumeracion)
        {
            case Tipo.Genin: return new Ninja(new Kama(),new ArmaduraPaja());
            case Tipo.Chulin: return new Ninja(new Katana(),new ArmaduraBronce());
            case Tipo.Jounin: return new Ninja(new Katanaka(),new ArmaduraAcero());
            default: return new Ninja(new Kama(),new ArmaduraPaja());
        }
    }
}

let JacintoInicial = new FactoriaNinja().dameNinja(Tipo.Chulin);
let JacintoIntermedio = new FactoriaNinja().dameNinja(Tipo.Genin);
let JacintoMaster = new FactoriaNinja().dameNinja(Tipo.Jounin);
