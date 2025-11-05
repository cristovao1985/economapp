import axios from 'axios'

export default {
  getNfeData: (nfeUrl) => {
    return axios({
      method: 'post',
      url: 'https://n8n.lineasoft.com.br/webhook/c4460e99-2ad9-419b-917e-faf4df97ce01',
      data: {
        nfeUrl,
      },
    })
  },
  shareProduct: (product) => {
    axios({
      method: 'post',
      url: 'https://databases-nocodb.ucgkrp.easypanel.host/api/v2/tables/mznk68lqxmto88c/records',
      data: product,
      headers: {
        'xc-token': '8Hxrh7DVsKRCNf8o43UfT-T2wNCiUL4N9VpJ2Zmk',
      },
    })
  },
  shareNfe: (nfe) => {
    axios({
      method: 'post',
      url: 'https://databases-nocodb.ucgkrp.easypanel.host/api/v2/tables/mrac7rvcecar7gd/records',
      data: nfe,
      headers: {
        'xc-token': '8Hxrh7DVsKRCNf8o43UfT-T2wNCiUL4N9VpJ2Zmk',
      },
    })
  },
  getProdutos: () => {
    return axios({
      method: 'get',
      url: 'https://databases-nocodb.ucgkrp.easypanel.host/api/v2/tables/mznk68lqxmto88c/records?limit=200',
      headers: {
        'xc-token': '8Hxrh7DVsKRCNf8o43UfT-T2wNCiUL4N9VpJ2Zmk',
      },
    })
  },
  getProdutosByName: (param) => {
    return axios({
      method: 'get',
      url: `https://databases-nocodb.ucgkrp.easypanel.host/api/v2/tables/mznk68lqxmto88c/records?where=(nome,like,${param})&limit=100`,
      headers: {
        'xc-token': '8Hxrh7DVsKRCNf8o43UfT-T2wNCiUL4N9VpJ2Zmk',
      },
    })
  },
}
