package ch.bbw.coolcarsbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class CarController implements ApplicationRunner {

    @Autowired
    private CarRepository carRepository;

    // Endpoint for sorted cars
    @GetMapping("cars/sorted")
    public List<Car> getSortedCars(
            @RequestParam String criteria,
            @RequestParam String order) {

        if (!criteria.matches("brand|model|horsePower") || !order.matches("asc|desc")) {
            throw new IllegalArgumentException("Invalid sort criteria or order");
        }

        // Create a Sort object
        Sort sort = order.equals("asc")
                ? Sort.by(Sort.Order.asc(criteria))
                : Sort.by(Sort.Order.desc(criteria));

        // Fetch sorted cars
        return (List<Car>) carRepository.findAll(sort);
    }

    @GetMapping("cars/search")
    public List<Car> search(@RequestParam String query, @RequestParam(defaultValue = "0") int page) {
        int size = 5;
        int totalPages = 10;  
        
        if (page >= totalPages) {
            page = totalPages - 1; 
        }
    
        List<Car> cars = carRepository.findAll(); 
    
        // If the query is empty, return all cars with pagination
        if (query == null || query.trim().isEmpty()) {
            return cars.stream()       
            .skip(page * size)  
            .limit(size)      
            .collect(Collectors.toList());
        }
    
        // Try to parse the query as an integer for horsepower search
        try {
            int queryInt = Integer.parseInt(query);
            return cars.stream()
                    .filter(car -> 
                        car.getBrand().toUpperCase().contains(query.toUpperCase()) || 
                        car.getModel().toUpperCase().contains(query.toUpperCase()) ||
                        car.getHorsePower() == queryInt
                    )
                    .skip(page * size) 
                    .limit(size)        
                    .collect(Collectors.toList());
        } catch (NumberFormatException e) {
            // If the query is not a number, filter by brand and model
            return cars.stream()
                    .filter(car -> 
                        car.getBrand().toUpperCase().contains(query.toUpperCase()) || 
                        car.getModel().toUpperCase().contains(query.toUpperCase())
                    )
                    .skip(page * size)
                    .limit(size)       
                    .collect(Collectors.toList());
        }
    }

    

    // Endpoint for all cars without sorting or filter criteria
    @GetMapping("cars")
    public List<Car> getCars() {
        return (List<Car>) carRepository.findAll();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Seed initial data
        carRepository.save(new Car(0, "Dodge", "Challenger", 500));
        carRepository.save(new Car(0, "Ford", "Mustang", 450));
        carRepository.save(new Car(0, "Chevrolet", "Camaro", 400));
    }

    @GetMapping("cars/{id}")
    public Car getACar(@PathVariable int id) {
        return carRepository.findById(id).orElse(null);
    }
}
