using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercise2
{
    public class Triangular:Tower
    {
        public Triangular(int height, int width):base(height, width) 
        { 

        }

        public override double Perimeter()
        {
            double hypotenuse = Math.Sqrt(this.Height * this.Height + this.Width*0.5 * this.Width*0.5);
            double per = hypotenuse * 2 + this.Width;
            return per;
        }

        public void Print()
        {
            if (this.Width % 2 == 0 || this.Height * 2 < this.Width)
            {
                Console.WriteLine(("The triangle cannot be printed"));
                return;
            }
            int numLines = this.Height - 2;
            int numUniqeLines = (this.Width - 2) / 2;
            if(numUniqeLines==0)
            {
                for(int i = 0; i < this.Height-1; i++) 
                {
                    PrintLine(1, this.Width / 2 - 1);
                }
                PrintLine(this.Width, 0);
                return;
            }
            int x = numLines / numUniqeLines;
            int rest = numLines % numUniqeLines;
            int spaces = this.Width / 2;
            PrintLine(1, spaces);
            int numStarts = 1;
            for (int i = 0; i < numUniqeLines; i++)
            {
                spaces -= 1;
                numStarts += 2;
                for(int j=0; j<x;j++)
                {
                    PrintLine(numStarts,spaces);
                }
                if (i == 0)
                {
                    for (int j = 0; j < rest; j++)
                    {
                        PrintLine(3, spaces);
                    }
                }
            }
            PrintLine(this.Width, 0);
        }

        private  void PrintLine(int num, int spaces)
        {
            for (int i = 0; i < spaces; i++)
            {
                Console.Write(' ');
            }
            for (int i = 0; i < num; i++)
            {
                Console.Write('*');
            }
            Console.WriteLine();
        }

    }
}
