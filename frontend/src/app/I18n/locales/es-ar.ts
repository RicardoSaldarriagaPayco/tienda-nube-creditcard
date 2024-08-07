export default {
  translations: {
    menu: {
      home: "Comenzar",
      "examples-gallery": "Galería de ejemplo",
      "store-products": "Productos de mi tienda",
    },
    "base-layout": {
      help: "Ayuda para desarrolladores",
      back: "Voltar",
      "aria-label": {
        menu: "Menú principal",
      },
    },
    home: {
      "first-card": {
        title: "¡Felicitaciones por crear su aplicación!",
        description:
          "Esta aplicación de ejemplo incluye nuestro <0>Nimbus Design System</0> y la integración con la <1>API Tiendanube/Nuvemshop</1> para facilitar el desarrollo de nuevas aplicaciones para nuestro ecosistema.",
        link: {
          text: "Obtenga más información sobre cómo crear su aplicación",
          url: "https://dev.tiendanube.com/docs/applications/overview",
        },
      },
      "second-card": {
        title: "Mostrador de productos de la tienda",
        description:
          "Los productos de ejemplo se crean con el nombre y el precio aleatorios como ejemplo. Puedes modificarlos y eliminarlos en cualquier momento.",
        "total-product": "Productos totales",
        "create-products": "Crear producto",
      },
    },
    tutorial: {
      title: "Completa el proceso de autenticación",
      firstTitle: "¿No tienes una cuenta?",
      secondTitle: "<0>Crea una cuenta</0> <1>ePayco</1>",
      thirdTitle: "<0>Iniciar sesión en tu cuenta</0> <1>ePayco</1>",
      fourthTitle: "<0>Haz clic en el avatar para ingresar al menú perfil en la opción “Configuración“ luego “Personalizaciones” y en el submódulo “Llaves secretas” se encontrarán las llaves para la configuración en los datos de tu cuenta</0>",
      save: "Guardar",
      first:
        "Acceda a <0>Datos básicos</0> en los detalles de la solicitud en el portal de socios. En el campo URL de redireccionamiento, copie y pegue la dirección",
      second:
        "En el campo URL de redireccionamiento, copie y pegue la dirección <0>http://{{appUrl}}</0>.",
      third:
        "Copia este final de la URL <0>/admin/apps/{{clientId}}/authorize</0> y pégalo al final de la URL de la tienda donde instalarás la aplicación.",
      fourth:
        "Haga clic en el botón <0>Aceptar y comenzar a usar</0> para instalar la aplicación.",
      fifth:
        "Después de la redirección a la plantilla de aplicación, se ejecutará la solicitud y se completará el proceso de autenticación.",
      sixth:
        "ePayco es una compañía tecnológica que brinda una solución de pagos y recaudos integral a personas, empresas e instituciones, resolviendo todas tus necesidades de vender y recaudar a través de internet con las mejores gestiones y experiencia para tus clientes."
    },
    success:{
      ready: "Listo!",
      configured: "Su aplicación ha sido cofigurada exitosamente",
      shop: "ir a la tienda"
    },
    products: {
      title: "Productos de la tienda",
      name: "Nombre",
      remove: "Borrar",
      "no-content": "No hay productos para mostrar",
      selected: {
        single: "Seleccionado",
        many: "Seleccionados",
      },
    },
  },
};
