using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercise2
{
    public class Rectangle:Tower
    {
        public Rectangle(int height, int width):base(height, width)
        {

        }

        public override double Perimeter()
        {
            return this.Height*2+this.Width*2;
        }

        public int CalcArea()
        {
            return this.Height*this.Width;
        }

    }
}
