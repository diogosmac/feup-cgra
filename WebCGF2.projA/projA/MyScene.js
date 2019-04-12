/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterialsAndTextures();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        // this.prism = new MyPrism(this, 8);
        // this.pyramid = new MyPyramid(this, 5, 1);
        this.treeGroup = new MyTreeGroupPatch(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.treeRow = new MyTreeRowPatch(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.house = new MyHouse(this, 3.5,
                                this.brickTexture,
                                this.doorTexture,
                                this.balconyTexture,
                                this.roofTexture,
                                this.houseDetailTexture,
                                this.columnTexture,
                                this.welcomeMatTexture,
                                this.windowTexture);
        this.smallHouse = new MyHouse(this, 2,
                                this.brickTexture,
                                this.doorTexture,
                                this.balconyTexture,
                                this.roofTexture,
                                this.houseDetailTexture,
                                this.columnTexture,
                                this.welcomeMatTexture,
                                this.windowTexture);
        this.hill = new MyVoxelHill(this, 4, 2);
        this.complexTree = new MyComplexTree(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.floor = new MyQuad(this);
        this.cubeMap = new MyCubeMap(this);
        // FALTAM AS TEXTURAS

        this.initObjectTextCoords();

        //Objects connected to MyInterface
        this.displayNormals = false;
        this.textsEnable = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        // this.lights[0].disable();
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(-2, 3, 2, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].setVisible(true);
        this.lights[1].update();

        this.lights[2].setPosition(3, 3, 2, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].enable();
        this.lights[2].setVisible(true);
        this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    initMaterialsAndTextures() {

        // Matterials

        this.diffuseMaterial = new CGFappearance(this);
        this.diffuseMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.diffuseMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.diffuseMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.diffuseMaterial.setShininess(10.0);

        this.specularMaterial = new CGFappearance(this);
        this.specularMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.specularMaterial.setDiffuse(0.3, 0.3, 0.3, 1);
        this.specularMaterial.setSpecular(0.8, 0.8, 0.8, 1);
        this.specularMaterial.setShininess(10.0);

        this.matteMaterial = new CGFappearance(this);
        this.matteMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.matteMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.matteMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.matteMaterial.setShininess(10.0);


        // Textures

        // Trees
        this.treeTrunkTexture = new CGFtexture(this, 'images/trunkTexture.png');
        this.grassTexture = new CGFtexture(this, 'images/grassTexture.jpg');
        this.leavesTexture = new CGFtexture(this, 'images/pineNeedles.jpg');

        // Houses
        this.brickTexture = new CGFtexture(this, 'images/brickWall.jpg');
        this.doorTexture = new CGFtexture(this, 'images/door.jpg');
        this.balconyTexture = new CGFtexture(this, 'images/balconyFloor.jpg');
        this.roofTexture = new CGFtexture(this, 'images/roofTiles.jpg');
        this.houseDetailTexture = new CGFtexture(this, 'images/rodape.jpg');
        this.columnTexture = new CGFtexture(this, 'images/marbleColumn.jpg');
        this.welcomeMatTexture = new CGFtexture(this, 'images/welcomeMat.jpg');
        this.windowTexture = new CGFtexture(this, 'images/window.jpg');
    }

    initObjectTextCoords() {

        this.floor.texCoords = [
            0, 4,
            4, 4,
            0, 0,
            4, 0
        ];
        this.floor.updateTexCoordsGLBuffers();
    }

    updateTextures() {
        this.enableTextures(this.textsEnable);
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        // this.setDefaultAppearance();
        this.lights[1].update();
        this.lights[2].update();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        this.scale(0.5, 0.5, 0.5);

        if (this.displayNormals) {
            // this.prism.enableNormalViz();
            this.treeGroup.enableNormalViz();
            this.treeRow.enableNormalViz();
            this.house.enableNormalViz();
            this.smallHouse.enableNormalViz();
            this.hill.enableNormalViz();
            this.complexTree.enableNormalViz();
            this.floor.enableNormalViz();
            this.cubeMap.enableNormalViz();
        }
        else {
            // this.prism.disableNormalViz();
            this.treeGroup.disableNormalViz();
            this.treeRow.disableNormalViz();
            this.house.disableNormalViz();
            this.smallHouse.disableNormalViz();
            this.hill.disableNormalViz();
            this.complexTree.disableNormalViz();
            this.floor.disableNormalViz();
            this.cubeMap.disableNormalViz();
        }

        this.diffuseMaterial.setTexture(this.grassTexture);
        this.diffuseMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.diffuseMaterial.apply();

        this.pushMatrix();

        this.scale(100, 100, 100);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.floor.display();
        this.rotate(Math.PI, 0, 1, 0);
        this.floor.display();

        this.popMatrix();

        this.pushMatrix();
        this.translate(-35, 0, -12);
        this.scale(3.5, 3.5, 3.5);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-25, 0, -25);
        this.scale(5, 5, 5);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(34, 0, 0);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-20, 0, 10);
        this.rotate(Math.PI/2, 0, 1, 0);
        this.smallHouse.display();
        this.popMatrix();

        
        this.hill.display();


        this.pushMatrix();
        
        this.translate(0, 8, 0);
        this.scale(3.5, 3.5, 3.5);
        this.complexTree.display();
        // it's a chris pine
        this.popMatrix();

        this.pushMatrix();
        this.cubeMap.material.apply();
        this.cubeMap.display();
        this.popMatrix();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}