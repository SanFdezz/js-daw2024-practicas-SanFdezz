function Rectangulo(ancho,alto){

    if(isNaN(ancho) ||ancho<=0){
        this.width = 1;
    } else {
        this.width = ancho;
    }

    if(isNaN(alto) || alto<=0){
        this.height = 1; 
    } else {
        this.height = alto; 
    }

    this.cambiarDimensiones=(num1,num2)=>{
        if(num1<=0){
            this.width = 1;
        } else {
            this.width = num1;
        }
    
        if(num2<=0){
            this.height = 1; 
        } else {
            this.height = num2; 
        }
    }

    this.calcularArea=()=>{
        return this.width*this.height;
    }

    this.copia=()=>{
        return new Rectangulo(this.width, this.height);
    }

    this.comparar=(rectangulo2)=>{
        if(this.calcularArea()<rectangulo2.calcularArea()){
            return 'menor'
        } else if(this.calcularArea()>rectangulo2.calcularArea()){
            return 'mayor'
        } else {
            return 'igual';
        }
    }

}