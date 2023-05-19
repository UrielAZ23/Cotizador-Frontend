export class Article{
    constructor(
        public _id:string,
        public title:string,
        public content:string,
        public pricing:number,
        public stock:number,
        public image:string,
        public date:any
    ){

    }
}