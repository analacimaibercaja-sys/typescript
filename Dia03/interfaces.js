var Katana = /** @class */ (function () {
    function Katana() {
    }
    Katana.prototype.dameFuerzaDeAtaque = function () {
        return 50;
    };
    return Katana;
}());
var Shuriken = /** @class */ (function () {
    function Shuriken() {
    }
    Shuriken.prototype.dameFuerzaDeAtaque = function () {
        return 10;
    };
    return Shuriken;
}());
var Kunai = /** @class */ (function () {
    function Kunai() {
    }
    Kunai.prototype.dameFuerzaDeAtaque = function () {
        return 15;
    };
    return Kunai;
}());
var Kama = /** @class */ (function () {
    function Kama() {
    }
    Kama.prototype.dameFuerzaDeAtaque = function () {
        return 5;
    };
    return Kama;
}());
var ArmaduraPaja = /** @class */ (function () {
    function ArmaduraPaja() {
    }
    ArmaduraPaja.prototype.dameDefensa = function () {
        return 10;
    };
    return ArmaduraPaja;
}());
var ArmaduraBronce = /** @class */ (function () {
    function ArmaduraBronce() {
    }
    ArmaduraBronce.prototype.dameDefensa = function () {
        return 15;
    };
    return ArmaduraBronce;
}());
var ArmaduraAcero = /** @class */ (function () {
    function ArmaduraAcero() {
    }
    ArmaduraAcero.prototype.dameDefensa = function () {
        return 100;
    };
    return ArmaduraAcero;
}());
var Tipo;
(function (Tipo) {
    Tipo[Tipo["Genin"] = 0] = "Genin";
    Tipo[Tipo["Chunin"] = 1] = "Chunin";
    Tipo[Tipo["Jounin"] = 2] = "Jounin";
})(Tipo || (Tipo = {}));
;
var Ninja = /** @class */ (function () {
    function Ninja(ataque, defensa) {
        this.Ataque = ataque;
        this.Defensa = defensa;
    }
    return Ninja;
}());
//let miNinja = new Ninja(new Katana(), new ArmaduraAcero);
var FactoriaNinja = /** @class */ (function () {
    function FactoriaNinja() {
    }
    FactoriaNinja.prototype.dameNinja = function (TipoNinja) {
        switch (TipoNinja) {
            case Tipo.Genin: return new Ninja(new Kama(), new ArmaduraPaja());
            case Tipo.Chunin: return new Ninja(new Katana(), new ArmaduraBronce());
            case Tipo.Jounin: return new Ninja(new Shuriken(), new ArmaduraAcero());
            default: return new Ninja(new Kama(), new ArmaduraPaja());
        }
    };
    return FactoriaNinja;
}());
var miNinjaInicial = new FactoriaNinja().dameNinja(Tipo.Genin);
var miNinjaIntermedio = new FactoriaNinja().dameNinja(Tipo.Chunin);
var miNinjaMaster = new FactoriaNinja().dameNinja(Tipo.Jounin);
