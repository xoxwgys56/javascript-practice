public class Hierachy {
    public class Employee {
        public String name = "";
        public String dept = "general";
    }

    public class Manager extends Employee {
        public Employee[] reports = new Employee[0];
    }

    public class WorkerBee extends Employee {
        public String[] projects = new String[0];
    }

    public class SalesPerson extends WorkerBee {
        public String dept = "sales";
        public double quota = 100.0;
    }

    public class Engineer extends WorkerBee {
        public String dept = "engineering";
        public String machine = "";
    }
}