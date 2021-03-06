var productModel = require("../models/productsModel")

module.exports = {
    getAll: async function(req, res, next) {
        try{
            let dataProductos = await productModel.find();
            res.status(200).json({status: "success", message: "ok", data: dataProductos});
        }catch(err){
            next(err);
        }
        
            
    },
    getById: function(req, res, next) {
       let id = req.params.productId;
       productModel.findById(id, function(err, data){
           if (err) {
               next(err);
           } else {
               if(data.enabled == false){
                res.status(404).json({error: "Producto no disponible"});
               }else{
                res.status(200).json({status: "success", message: "ok", data: data});
               }

           }
       });
      },
    update: async function(req, res, next) {
        let id = req.params.productId;
        productModel.findById(id, async function(err, data){
            if (err) {
                next(err);
            } else {
                let patch = await productModel.findByIdAndUpdate(id, { $set: { enabled: !data.enabled }})
                res.status(200).json({status: "success", message: "Product edited."});
            }
        });
        

    },
    save: async function(req, res, next) {
        var product = new productModel({ 
            description: req.body.description, 
            image_url: req.body.image_url, 
            price: req.body.price,
            list_price: req.body.list_price,
            discount: req.body.discount,
            enabled: req.body.enabled
        });
        var result = await product.save()

        res.status(200).json({status: "success", message: "Product added successfully!!!", data: result});
   },
   seed: async function(req, res, next) {
    let productos = [
        {
            description: 'Smart TV LG 43 \" 4K Ultra HD 43UJ6560',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/smart-tv-lg-43-4k-ultra-hd-43uj6560/ea1ad44603acda220729bbbb8afc70c2feb381f32044ccc0a02383242c34142f',
            price: 15999,
            list_price: 19999,
            discount: 20
        },
        {
            description: 'TV LED Philips 32 \" HD 32PHG5001/77',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/tv-led-philips-32-hd-32phg500177/de3c95989891cf0494772062a0d75f11ee563d874c4d832414339fb31491d057',
            price: 5999,
            list_price: 6999,
            discount: 14
        },
        {
            description: 'Smart TV Philips 43 \" Full HD 43PFG5102/77',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/smart-tv-philips-43-full-hd-43pfg510277/0377d2ef6ef718783f5efacbe1f7e67df1859f037351487221a85131e8a88351',
            price: 10999,
            list_price: 12999,
            discount: 15
        },
        {
            description: 'Smart TV HISENSE 32 \" HD LED HLE3217RT',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/smart-tv-hisense-32-hd-led-hle3217rt/0a01725e7b8ed7ab4e05f00980792ad2180ab2fe95094c85aef7060b2d96aa6f',
            price: 6999,
            list_price: 7499,
            discount: 7
        },
        {
            description: 'Lavarropas AutomÃ¡tico Drean 5 KG CONCEPT 5.05 V1 Blanco',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/lavarropas-automatico-drean-5-kg-concept-5.05-v1-blanco/18125a5111609f25787a0fe43ba91dbca5f3fd36d575ee6ede509bca502f7018',
            price: 7699,
            list_price: 9599,
            discount: 20
        },
        {
            description: 'Pava ElÃ©ctrica ATMA PE5106E Blanco',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/pava-electrica-atma-pe5106e-blanco/b0732f6005a7791ec8794c96a4feaa68d585b4e70d3f73c475db1a0f1056745f',
            price: 689,
            list_price: 899,
            discount: 23
        },
        {
            description: 'Pava ElÃ©ctrica Philips HD4691/20 Negro',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/pava-electrica-philips-hd469120-negro/0a73f76e0cfe614adf28db6d0331e5da2fc53f99553a7903740f58c01e180e4a',
            price: 1399,
            list_price: 1499,
            discount: 7
        },
        {
            description: 'Tostadora ATMA TO8013E',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/tostadora-atma-to8013e/97ae407e6ec524295b59e9c12f5bc811a65a53b6e8d58e4262c8dfe5a31609fc',
            price: 799,
            list_price: 799,
            discount: 0
        },
        {
            description: 'Horno elÃ©ctrico ATMA 23 Lts HG2310E ',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/horno-electrico-atma-23-lts-hg2310e/569dffd210894a36ce78e0c38eeed8fecc28930c3543faf06201713425b062d9',
            price: 2249,
            list_price: 2799,
            discount: 20
        },
        {
            description: 'SET de 2 Banquetas Taburetes HidrÃ¡ulicos Color Negro (2 unid',
            image_url: '//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/set-de-2-banquetas-taburetes-hidraulicos-color-negro-2-unid/b1a20f485cd8b917f47833f9b266c1bddb8cebc57dd623fa3495251cb127b715',
            price: 2199,
            list_price: 3199,
            discount: 31
        }
    ];

    for (producto of productos){
        let product = new productModel(producto);
        await product.save();
    }

    res.status(200).json({message: "Base seeded"});
}
}