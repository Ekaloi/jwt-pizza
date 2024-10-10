import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.route('*/**/api/docs', async (route) => {
    if (route.request().method() === 'PUT') {
      const docsRes = {
        version: "20240926.195142",
        endpoints: [
          {
            method: "POST",
            path: "/api/auth",
            description: "Register a new user",
            example:
              'curl -X POST localhost:3000/api/auth -d \'{"name":"pizza diner", "email":"d@jwt.com", "password":"diner"}\' -H \'Content-Type: application/json\'',
            response: {
              user: {
                id: 2,
                name: "pizza diner",
                email: "d@jwt.com",
                roles: [
                  {
                    role: "diner",
                  },
                ],
              },
              token: "tttttt",
            },
          },
          {
            method: "PUT",
            path: "/api/auth",
            description: "Login existing user",
            example:
              'curl -X PUT localhost:3000/api/auth -d \'{"email":"a@jwt.com", "password":"admin"}\' -H \'Content-Type: application/json\'',
            response: {
              user: {
                id: 1,
                name: "常用名字",
                email: "a@jwt.com",
                roles: [
                  {
                    role: "admin",
                  },
                ],
              },
              token: "tttttt",
            },
          },
          {
            method: "PUT",
            path: "/api/auth/:userId",
            requiresAuth: true,
            description: "Update user",
            example:
              'curl -X PUT localhost:3000/api/auth/1 -d \'{"email":"a@jwt.com", "password":"admin"}\' -H \'Content-Type: application/json\' -H \'Authorization: Bearer tttttt\'',
            response: {
              id: 1,
              name: "常用名字",
              email: "a@jwt.com",
              roles: [
                {
                  role: "admin",
                },
              ],
            },
          },
          {
            method: "DELETE",
            path: "/api/auth",
            requiresAuth: true,
            description: "Logout a user",
            example: "curl -X DELETE localhost:3000/api/auth -H 'Authorization: Bearer tttttt'",
            response: {
              message: "logout successful",
            },
          },
          {
            method: "GET",
            path: "/api/order/menu",
            description: "Get the pizza menu",
            example: "curl localhost:3000/api/order/menu",
            response: [
              {
                id: 1,
                title: "Veggie",
                image: "pizza1.png",
                price: 0.0038,
                description: "A garden of delight",
              },
            ],
          },
          {
            method: "PUT",
            path: "/api/order/menu",
            requiresAuth: true,
            description: "Add an item to the menu",
            example:
              'curl -X PUT localhost:3000/api/order/menu -H \'Content-Type: application/json\' -d \'{ "title":"Student", "description": "No topping, no sauce, just carbs", "image":"pizza9.png", "price": 0.0001 }\'  -H \'Authorization: Bearer tttttt\'',
            response: [
              {
                id: 1,
                title: "Student",
                description: "No topping, no sauce, just carbs",
                image: "pizza9.png",
                price: 0.0001,
              },
            ],
          },
          {
            method: "GET",
            path: "/api/order",
            requiresAuth: true,
            description: "Get the orders for the authenticated user",
            example: "curl -X GET localhost:3000/api/order  -H 'Authorization: Bearer tttttt'",
            response: {
              dinerId: 4,
              orders: [
                {
                  id: 1,
                  franchiseId: 1,
                  storeId: 1,
                  date: "2024-06-05T05:14:40.000Z",
                  items: [
                    {
                      id: 1,
                      menuId: 1,
                      description: "Veggie",
                      price: 0.05,
                    },
                  ],
                },
              ],
              page: 1,
            },
          },
          {
            method: "POST",
            path: "/api/order",
            requiresAuth: true,
            description: "Create a order for the authenticated user",
            example:
              'curl -X POST localhost:3000/api/order -H \'Content-Type: application/json\' -d \'{"franchiseId": 1, "storeId":1, "items":[{ "menuId": 1, "description": "Veggie", "price": 0.05 }]}\'  -H \'Authorization: Bearer tttttt\'',
            response: {
              order: {
                franchiseId: 1,
                storeId: 1,
                items: [
                  {
                    menuId: 1,
                    description: "Veggie",
                    price: 0.05,
                  },
                ],
                id: 1,
              },
              jwt: "1111111111",
            },
          },
          {
            method: "GET",
            path: "/api/franchise",
            description: "List all the franchises",
            example: "curl localhost:3000/api/franchise",
            response: [
              {
                id: 1,
                name: "pizzaPocket",
                stores: [
                  {
                    id: 1,
                    name: "SLC",
                  },
                ],
              },
            ],
          },
          {
            method: "GET",
            path: "/api/franchise/:userId",
            requiresAuth: true,
            description: "List a user's franchises",
            example: "curl localhost:3000/api/franchise/4  -H 'Authorization: Bearer tttttt'",
            response: [
              {
                id: 2,
                name: "pizzaPocket",
                admins: [
                  {
                    id: 4,
                    name: "pizza franchisee",
                    email: "f@jwt.com",
                  },
                ],
                stores: [
                  {
                    id: 4,
                    name: "SLC",
                    totalRevenue: 0,
                  },
                ],
              },
            ],
          },
          {
            method: "POST",
            path: "/api/franchise",
            requiresAuth: true,
            description: "Create a new franchise",
            example:
              'curl -X POST localhost:3000/api/franchise -H \'Content-Type: application/json\' -H \'Authorization: Bearer tttttt\' -d \'{"name": "pizzaPocket", "admins": [{"email": "f@jwt.com"}]}\'',
            response: {
              name: "pizzaPocket",
              admins: [
                {
                  email: "f@jwt.com",
                  id: 4,
                  name: "pizza franchisee",
                },
              ],
              id: 1,
            },
          },
          {
            method: "DELETE",
            path: "/api/franchise/:franchiseId",
            requiresAuth: true,
            description: "Delete a franchises",
            example:
              "curl -X DELETE localhost:3000/api/franchise/1 -H 'Authorization: Bearer tttttt'",
            response: {
              message: "franchise deleted",
            },
          },
          {
            method: "POST",
            path: "/api/franchise/:franchiseId/store",
            requiresAuth: true,
            description: "Create a new franchise store",
            example:
              "curl -X POST localhost:3000/api/franchise/1/store -H 'Content-Type: application/json' -d '{\"franchiseId\": 1, \"name\":\"SLC\"}' -H 'Authorization: Bearer tttttt'",
            response: {
              id: 1,
              franchiseId: 1,
              name: "SLC",
            },
          },
          {
            method: "DELETE",
            path: "/api/franchise/:franchiseId/store/:storeId",
            requiresAuth: true,
            description: "Delete a store",
            example:
              "curl -X DELETE localhost:3000/api/franchise/1/store/1  -H 'Authorization: Bearer tttttt'",
            response: {
              message: "store deleted",
            },
          },
        ],
        config: {
          factory: "https://pizza-factory.cs329.click",
          db: "127.0.0.1",
        },
      };
      expect(route.request().method()).toBe('Get');
      await route.fulfill({ json: docsRes });
    } else{
      route.continue;
    }});

  await page.goto('/');
  expect(await page.title()).toBe('JWT Pizza');

  await page.goto('/docs');
  expect(await page.getByText('JWT Pizza API')).toBeVisible();

});






test('buy pizza with login', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
      if (route.request().method() === 'PUT') {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { 
          user: { 
            id: 3, 
            name: 'Kai Chen', 
            email: 'd@jwt.com', 
            roles: [{ role: 'diner' }] 
          }, 
          token: 'abcdef' 
        };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      } else{
        route.continue;
      }});

      await page.route('*/**/api/auth', async (route) => {
        if(route.request().method()=== 'DELETE'){
        const loginRes = { message: 'logout successful' };
        expect(route.request().method()).toBe('DELETE');
        await route.fulfill({ json: loginRes });
        }else{
          route.continue();
        }
      });


      await page.goto('/login');

      await page.getByPlaceholder('Email address').click();
      await page.getByPlaceholder('Email address').fill('d@jwt.com');
      await page.getByPlaceholder('Email address').press('Tab');
      await page.getByPlaceholder('Password').fill('a');
      await page.getByRole('button', { name: 'Login' }).click();

      await page.getByRole('link', { name: 'History' }).click();
      expect(await page.getByText('Mama Rucci, my my')).toBeVisible();
      await page.getByRole('link', { name: 'home' }).click();
      expect(await page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
      await page.goto('/about');
      await page.goto('/logout');
     
  });

  test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  
    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });
  
    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.route('*/**/api/order', async (route) => {
      const orderReq = {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
      };
      const orderRes = {
        order: {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
          id: 23,
        },
        jwt: 'eyJpYXQ',
      };
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(orderReq);
      await route.fulfill({ json: orderRes });
    });
  
    await page.goto('/');
  
    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();
  
    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();
  
    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();
  }); 

  test('Register', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const registerReq = { email: 'd@jwt.com', password: 'a' };
        const registerRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(registerReq);
        await route.fulfill({ json: registerRes });
      });

    await page.goto('/register');

    await page.getByPlaceholder('Full name').click();
    await page.getByPlaceholder('Full name').fill('Kai Chen');

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Register' }).click();
  });


  test('Franchise Dashboard', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 4, name: 'pizza franchisee', email: 'd@jwt.com', roles: [{ role: 'franchisee' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/4', async (route) => {
        const franchiseRes = [{ id: 4, name: 'pizzaPocket', admins: [{ id: 4, name: 'pizza franchisee', email: 'd@jwt.com' }], stores: [{ id: 4, name: 'SLC', totalRevenue: 0 }] }];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
      });

    await page.goto('/franchise-dashboard');

    await page.getByRole('link', { name: 'login', exact: true }).click();

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await page.goto('/franchise-dashboard');
  });


  test('Admin Dashboard', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'a' };
        const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'tttttt' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route(`/api/franchise/1/store/10`, async (route) => {
      const deleteRes = { message: 'store deleted' };
      expect(route.request().method()).toBe('DELETE');
      await route.fulfill({ json: deleteRes });
  });

    await page.route('*/**/api/franchise', async (route) => {
       const franchiseRes = [
        {
          id: 1,
          name: 'pizzaPocket',
          admins: [
            {
              id: 3,
              name: 'pizza franchisee',
              email: 'f@jwt.com',
            },
          ],
          stores: [
            {
              id: 10,
              name: 'SLC',
              totalRevenue: 0.008,
            },
          ],
        },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText("Mama Ricci's kitchen");

    await page.getByRole('row', { name: 'SLC 0.008 ₿ Close' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Close' }).click();
  });


  test('Admin Dashboard close franchise', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'a' };
        const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'tttttt' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
       const franchiseRes = [
        {
          id: 1,
          name: 'pizzaPocket',
          admins: [
            {
              id: 3,
              name: 'pizza franchisee',
              email: 'f@jwt.com',
            },
          ],
          stores: [
            {
              id: 10,
              name: 'SLC',
              totalRevenue: 0.008,
            },
          ],
        },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText("Mama Ricci's kitchen");

    await page.getByRole('row', { name: 'pizzaPocket pizza franchisee' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Close' }).click();
  });



  test('Diner Dashboard', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'a' };
        const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'diner' }] }, token: 'tttttt' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await page.goto('/diner-dashboard');
    expect(await page.getByText('How have you lived this long')).toBeVisible();
    expect(await page.getByText('diner', { exact: true })).toBeVisible();
  });


  test('Diner Dashboard as franchisee', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'a' };
        const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'franchisee' }] }, token: 'tttttt' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await page.goto('/diner-dashboard');
    expect(await page.getByText('Franchisee on undefined')).toBeVisible();
  });


  test('Close franchise', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const registerReq = { email: 'd@jwt.com', password: 'a' };
        const registerRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(registerReq);
        await route.fulfill({ json: registerRes });
      });


  });