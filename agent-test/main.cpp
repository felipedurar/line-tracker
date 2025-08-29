#include <sio_client.h>
#include <iostream>
#include <thread>
#include <chrono>

using namespace sio;

int main() {
    sio::client client;

    //// Setup JWT auth header
    //client.set_open_listener([&]() {
    //    std::cout << "Connected to server!" << std::endl;
    //});

    client.set_open_listener([&]() {
        std::cout << "Connected to server!" << std::endl;
        // Send JWT right after connect
        client.socket()->emit("authenticate",
            sio::string_message::create("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInV1aWQiOiIyNzliNjU2MC1iNWRhLTQ3NTEtYjNkYi1mZDY0OTlmZmIzNDYiLCJtYW5pZmVzdFZlcnNpb24iOiIiLCJpYXQiOjE3NTYzMzUxMjN9.3Iqp_agH7is3B1QNckKzfYFxo1tmk3V6VvBOMe2gE_E"));
    });

    client.set_close_listener([](client::close_reason const& reason) {
        std::cout << "Disconnected: " << reason << std::endl;
    });

    client.set_fail_listener([]() {
        std::cout << "Connection failed!" << std::endl;
    });

    // Pass JWT via query or extra headers (depends on server setup)
    //client.set_extra_headers({
    //    {"Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInV1aWQiOiIyNzliNjU2MC1iNWRhLTQ3NTEtYjNkYi1mZDY0OTlmZmIzNDYiLCJtYW5pZmVzdFZlcnNpb24iOiIiLCJpYXQiOjE3NTYzMzUxMjN9.3Iqp_agH7is3B1QNckKzfYFxo1tmk3V6VvBOMe2gE_E"}
    //});

    std::map<std::string, std::string> headers;
    headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInV1aWQiOiIyNzliNjU2MC1iNWRhLTQ3NTEtYjNkYi1mZDY0OTlmZmIzNDYiLCJtYW5pZmVzdFZlcnNpb24iOiIiLCJpYXQiOjE3NTYzMzUxMjN9.3Iqp_agH7is3B1QNckKzfYFxo1tmk3V6VvBOMe2gE_E";

    // Connect
    client.connect("http://localhost:3000", headers);  // your server URL

    // Listen for "command"
    client.socket()->on("command", sio::socket::event_listener_aux(
        [](std::string const& name, sio::message::ptr const& data, bool hasAck, sio::message::list &ack_resp) {
            std::cout << "Received command: " << data->get_map()["cmd"]->get_string() << std::endl;

            std::string cmd = data->get_map()["cmd"]->get_string();

            if (cmd == "create_file_folder") {
                sio::message::ptr response = sio::object_message::create();

                // Array of files
                sio::message::ptr arr = sio::array_message::create();
                arr->get_vector().push_back(sio::string_message::create("file1.txt"));
                arr->get_vector().push_back(sio::string_message::create("file2.log"));
                arr->get_vector().push_back(sio::string_message::create("report.pdf"));

                response->get_map().insert({
                    {"status", sio::string_message::create("ok")},
                    {"data", arr}
                });

                ack_resp.push(response);


                //sio::message::ptr response = sio::object_message::create();

                //auto obj = response->get_map();
                //obj["status"] = sio::string_message::create("ok");

                // Array of files
                //sio::message::ptr arr = sio::array_message::create();
                //arr->get_vector().push_back(sio::string_message::create("file1.txt"));
                //arr->get_vector().push_back(sio::string_message::create("file2.log"));
                //arr->get_vector().push_back(sio::string_message::create("report.pdf"));

                //obj["data"] = arr;

                // send back via callback
                //ack_resp.
                //ack_resp.push(response);
            } else {
                sio::message::ptr response = sio::object_message::create();
                auto obj = response->get_map();
                obj["status"] = sio::string_message::create("error");
                obj["message"] = sio::string_message::create("Unknown command");
                ack_resp.push(response);
            }
        }
    ));

    // Keep alive
    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
}
