# DashKirana

**Your Local Kirana, Online.**

A mobile-first single-store grocery ordering platform for a local kirana shop.

## Included

### Customer
- Mobile-first home page
- Categories and product search
- Product detail pages
- Cart and quantity controls
- Delivery address checkout
- Cash on Delivery and online-payment placeholder
- Customer order history
- Order status tracking
- Demo OTP login

### Shop admin
- Protected admin login
- Dashboard metrics
- Add/edit/activate products
- Inventory controls
- Customer directory
- Order management and status updates

## Demo mode

The project runs with browser-local mock data by default, so it can be demonstrated without a database.

```env
NEXT_PUBLIC_DATA_MODE=mock
```

Customer demo login:
- Mobile: `9999999999`
- OTP: `123456`

Admin demo login:
- Mobile: `9999999999`
- PIN: `123456`

> Demo mode is suitable for presenting the product. It is not the final shared production database.

## Production setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor.
3. Configure Supabase Phone Auth/SMS provider.
4. Create the shop owner's Auth user.
5. Promote that user to admin:

```sql
update public.profiles set role='admin' where id='YOUR_AUTH_USER_UUID';
```

6. Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_DATA_MODE=supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

7. Install dependencies and run:

```bash
npm install
npm run dev
```

8. Test the complete flow on a phone-sized browser.
9. Deploy the repository to Vercel.
10. Connect the client's domain, such as `dashkirana.in`, after the production environment is verified.

## Important production notes

- Never put a Supabase service-role key in client-side code.
- Enable/configure Supabase Phone Auth before handing over real customer login.
- Configure an online payment gateway only after the COD flow is stable.
- Replace demo store address, phone number, delivery promise, logo assets and product catalog with the client's real information.
- Product image uploads can be connected to a Supabase Storage bucket named `product-images`.

## Recommended handover

Give the client:
1. Customer website URL
2. Admin URL: `/admin`
3. Admin account instructions
4. Supabase project ownership/access
5. Vercel project ownership/access
6. Domain registrar access
7. A short product/order-management guide

## Routes

Customer:
- `/`
- `/products`
- `/products/[id]`
- `/cart`
- `/checkout`
- `/orders`
- `/orders/[id]`
- `/account`
- `/login`

Admin:
- `/admin`
- `/admin/login`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`
- `/admin/inventory`
- `/admin/orders`
- `/admin/customers`
