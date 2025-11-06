interface IArmable{
    dameFuerzaDeAtaque():number;
}

class Katana implements IArmable{
    dameFuerzaDeAtaque(): number {
        return 50;
    }
}
class Shuriken implements IArmable{
    dameFuerzaDeAtaque(): number {
        return 10;
    }
}
class Kunai implements IArmable{
    dameFuerzaDeAtaque(): number {
        return 15;
    }
}
class Kama implements IArmable{
    dameFuerzaDeAtaque(): number {
        return 5;
    }
}

class Nunchaku implements IArmable{
    dameFuerzaDeAtaque(): number {
        return 20;
    }
}

interface IDefendible{
    dameDefensa():number;
}

class ArmaduraPaja implements IDefendible{
    dameDefensa(): number {
        return 10;
    }
}

class ArmaduraBronce implements IDefendible{
    dameDefensa(): number {
        return 15;
    }
}

class ArmaduraAcero implements IDefendible{
    dameDefensa(): number {
        return 100;
    }
}

class ArmaduraCuero implements IDefendible{
    dameDefensa(): number {
        return 30;
    }
}

enum Tipo{Genin,Chunin,Jounin,Dougetsu};

class Ninja{
    Ataque: IArmable;
    Defensa: IDefendible;
    constructor(ataque: IArmable, defensa: IDefendible){
        this.Ataque=ataque;
        this.Defensa=defensa;
    }
}


class FactoriaNinja{
    dameNinja(TipoNinja: Tipo):Ninja{
        switch (TipoNinja){
            case Tipo.Genin: return new Ninja(new Kama(),new ArmaduraPaja());
            case Tipo.Chunin: return new Ninja(new Katana(),new ArmaduraBronce());
            case Tipo.Jounin: return new Ninja(new Shuriken(),new ArmaduraAcero());
            case Tipo.Dougetsu: return new Ninja(new Nunchaku(),new ArmaduraCuero());
            default: return new Ninja(new Kama(),new ArmaduraPaja());
        }
    }
}

let miNinjaInicial = new FactoriaNinja().dameNinja(Tipo.Genin);
let miNinjaIntermedio = new FactoriaNinja().dameNinja(Tipo.Chunin);
let miNinjaMaster = new FactoriaNinja().dameNinja(Tipo.Jounin);
let miNinjaSensei = new FactoriaNinja().dameNinja(Tipo.Dougetsu);
