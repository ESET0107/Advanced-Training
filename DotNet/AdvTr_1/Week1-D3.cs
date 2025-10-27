using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvTr_1
{
    internal class Week1_D3
    {
    }
    interface IDraw
    {
        void Draw();
    }
    interface IDrawable
    {
        void Draw();
    }
    class Rectangle : IDraw, IDrawable
    {
        public void Draw()
        {
            Console.WriteLine("Drawing a rectangle");
        }
        void IDrawable.Draw()
        {
            Console.WriteLine("Drawing a rectangle - 1");
        }
    }
    class Square : IDraw, IDrawable
    {
        public void Draw()
        {
            Console.WriteLine("Drawing a square");
        }
        void IDrawable.Draw()
        {
            Console.WriteLine("Drawing a square - 1");
        }
    }
}
