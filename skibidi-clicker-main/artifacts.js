function choose(arg1, arg2) {
    if (Math.random > 0.5) {return arg1} else {return arg2};
}

class Artifact {
    constructor(kind, effects, starLevel, weight, id, isActive = true) {
        this.kind = kind;
        this.effects = effects;
        this.starLevel = starLevel;
        this.weight = weight;
        this.id = (id == undefined? Math.random() : id);
    };

    static getCombined(art1, art2) {
        let art3 = {
            kind: choose(art1.kind, art2.kind),
            effects: {},
            starLevel: Math.min(art1.starLevel, art2.starLevel),
            weight: art1.weight + art2.weight,
            id: Math.random(),
        };
        for (i of Object.keys(art1.effects)) {
            art3.effects[i] = art1.effects[i];
        };
        for (i of Object.keys(art2.effects)) {
            if (Object.keys(art3.effects).includes(i)) {
                art3.effects[i] = Math.max((art3.effects[i]+art2.effects[i]) * 0.8, Math.max(art3.effects[i],art2.effects[i])); 
            } else {
                art3.effects[i] = art2.effects[i];
            }
        }
        return art3;
    }
};

class ArtifactStorage {
    constructor(length, artifacts = []) {
        this.length = length;
        this.artifacts = artifacts;
    }

    addArtifact(art) {
        if (this.artifacts.length < this.length) {
            this.artifacts.push(art);
        } else {
            throw 'lengthExceeded';
        }
    }

    removeArtifact(art) {
        this.artifacts.splice(this.artifacts.indexOf(art), 1);
    }

    combineArtifacts(art1, art2) {
        const art3 = Artifact.getCombined(art1, art2);
        this.removeArtifact(art1);
        this.removeArtifact(art2);
        this.addArtifact(art3);
    }

    getArtById(id) {
        for (let art of this.artifacts) {
            if (art.id == id) {
                return art;
            }
        }
        throw 'notFound';
    }

    updateMults() {
        for (let art of this.artifacts) {
            
        }
    }
}

passiveInventory = new ArtifactStorage(3);
activeInventory = new ArtifactStorage(3);
