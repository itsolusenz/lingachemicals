import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Itemgroupadd = lazy(() => import('./product/itemgroup'));
const Usergroupadd = lazy(() => import('./product/usergroup'));
const Itemadd = lazy(() => import('./product/item'));
const Useradd = lazy(() => import('./product/user'));
const Taxadd = lazy(() => import('./product/tax'));
const Brandadd = lazy(() => import('./product/brand'));
const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
//const Order = lazy(() => import('./order/Order'));
//const Orders = lazy(() => import('./orders/Orders'));
const Itemgroup = lazy(() => import('./itemgroup/Products'));
const Item = lazy(() => import('./item/Products'));
const Brand = lazy(() => import('./brand/Products'));
const Usergroup = lazy(() => import('./usergroup/Products'));
const User = lazy(() => import('./user/Products'));
const Tax = lazy(() => import('./tax/Products'));
const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/products',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce/tax',
      element: <Tax />,
    },
    {
      path: 'apps/e-commerce/itemgroup',
      element: <Itemgroup />,
    },
    {
      path: 'apps/e-commerce/item',
      element: <Item />,
    },
    {
      path: 'apps/e-commerce/usergroup',
      element: <Usergroup />,
    },
    {
      path: 'apps/e-commerce/brand',
      element: <Brand />,
    },
    {
      path: 'apps/e-commerce/user',
      element: <User />,
    },
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <Product />,
    },
    {
      path: 'apps/e-commerce/tax/:productId/*',
      element: <Taxadd />,
    },
    {
      path: 'apps/e-commerce/brand/:productId/*',
      element: <Brandadd />,
    },
    {
      path: 'apps/e-commerce/itemgroup/:productId/*',
      element: <Itemgroupadd />,
    },
    {
      path: 'apps/e-commerce/item/:productId/*',
      element: <Itemadd />,
    },
    {
      path: 'apps/e-commerce/usergroup/:productId/*',
      element: <Usergroupadd />,
    },
    {
      path: 'apps/e-commerce/user/:productId/*',
      element: <Useradd />,
    },
    {
      path: 'apps/e-commerce/orders',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
};

export default ECommerceAppConfig;
