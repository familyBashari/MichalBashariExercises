using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercise2
{
    public abstract class Tower
    {
        public int Height { get; set; }
        public int Width { get; set; }
        public Tower(int height, int width)
        {
            this.Height = height;
            this.Width = width;
        }

        public abstract double Perimeter();

    }
}
