using System.Runtime.CompilerServices;
using static System.Net.Mime.MediaTypeNames;

namespace Exercise2
{
    internal class Program
    {
        public static void Start()
        {
            int choice;

            do
            {
                Console.WriteLine("Please select an option: 1 for a rectangular tower, 2 for a triangular tower and 3 for an exit");
                choice = int.Parse(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        RectangleTower();
                        break;
                    case 2:
                        TriangleTower();
                        break;
                    case 3:
                        Console.WriteLine("You left the program");
                        break;
                    default:
                        Console.WriteLine("Invalid option, please try again.");
                        break;
                }
            } while (choice != 3);
        }

        public static Tower MakeTower(int option)
        {
            Console.WriteLine("Enter height of tower");
            int height = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter width of tower");
            int width = int.Parse(Console.ReadLine());
            if(option==1)
                return new Rectangle(height, width);
            return new Triangular(height, width);
        }
        static void RectangleTower()
        {
            Tower tower = MakeTower(1);
            if (tower.Height==tower.Width || Math.Abs(tower.Height - tower.Width) > 5)
                Console.WriteLine(((Rectangle)tower).CalcArea());
            else
                Console.WriteLine(tower.Perimeter());
        }

        static void TriangleTower()
        {
            Tower tower = MakeTower(2);
            Console.WriteLine("Please select an option. Enter 1 to perimeter the triangular and 2 for print it");
            int option = int.Parse(Console.ReadLine());

            switch (option)
            {
                case 1:
                    Console.WriteLine(tower.Perimeter());
                    break;
                case 2:
                    ((Triangular)tower).Print();
                    break;
                default:
                    Console.WriteLine("Invalid option, please try again.");
                    break;
            }
        }

        static void Main(string[] args)
        {
            Start();
        }
    }
}