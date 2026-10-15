const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;

// test suite
describe("Test Login", function () {
  // test case 1
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    //  assert.strictEqual(response.status, 200); -> assert gaya node
    expect(response.status).to.equal(200); //assert gaya chai

    // Mencetak Response Body
    const data = await response.json();
    expect(data.message).to.eql("Login successful");

    // Simpan Token
    token = data.token;
  });
// test case 2
  it("Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
     const data = await response.json();
    //response status
    expect(response.status).to.equal(200);
    //Response Body
    expect(data.users[2].username).to.equal('bastian');

  });

  //test case 3 Add User
it("Positive Case Add User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "Pratiwi", // Memasukan Nama Baru
          age: 30 //Memasukan Umur
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    //response status
    expect(response.status).to.equal(201); //assert gaya chai
    expect(data.message).to.equal("User successfully added, Hi Pratiwi!")
  });

  //test case 4 Negative Case
  it("Negative Case Add User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: " ", // kosongkan nama
          age: 0 //kosongkan umur
        }),
      }
    );
    const data = await response.json();
    // console.log(data);
    //response status
    expect(response.status).to.equal(400); //assert gaya chai
    expect(data.error).to.equal("Missing username or age")

  });
});

