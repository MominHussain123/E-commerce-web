

const getCart = async () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:7000/gettocart`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((resp) => {
            const product = resp.data.data;
            document.getElementById("count").innerHTML = product.length
        }).catch((error) => {
            const status = error.response.status;
            if (error.response && (status === 401 || status === 403)) {
                window.location.href = "/login.html";
            }
            else {
                console.log(error);
            }
        })
}

getCart()   

function logout() {
    localStorage.removeItem('token')
    window.location.href = './signup.html'
}
const orderget = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:7000/getorder`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((resp) => {
            console.log(resp.data);

            // Clear container once, before loop
            document.querySelector("#container-box").innerHTML = "";

            // Loop through each order item
            resp.data.data.forEach((item) => {
                let price = item.productId.productPrice;
                let id = item._id;
                let status = item.status;
                let productName = item.productId.productName;
                let productImage = item.productId.productImage;

                // Create order box HTML
                let orderdata = `
                <div class="order-box" id="order-box">
                    <div class="box box1">
                        <img src="${productImage}" alt="productImage" />
                    </div>
                    <div class="box box2">
                        <p>${productName}</p>
                    </div>
                    <div class="box box3">
                        <p>${status}</p>
                    </div>
                    <div class="box box4">
                        <p>$${price}</p>
                    </div>
                    <div class="box box5">
                        <button onclick="orderdelete('${id}')">Track Order</button>
                    </div>
                </div>
                `;

                // Append each order box to the container
                document.querySelector("#container-box").innerHTML += orderdata;
            });
        })
        .catch((error) => {
            console.error('Error loading orders:', error);
        });
};

orderget();



const orderdelete =(id)=>{
    console.log(id);
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:7000/deleteOrders/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((resp) => {
        console.log(resp.data);
        alert(resp.data.message);
        orderget()
    }).catch(() => {
        console.error('Error deleting user:', error);
    })
}
