var list = [1, 2, 3];
var list2 = [1, 2, 3];
var x;
x = ["A", 2];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(Color.Green, c, Color[1]);
var str = "this is a string";
var num = str.length;
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var newName1 = o.a, newName2 = o.b;
console.log(newName1, newName2);
